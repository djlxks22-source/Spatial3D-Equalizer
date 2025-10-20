#include <oboe/Oboe.h>
#include <kissfft/kiss_fft.h>
#include <vector>

class AudioProcessor : public oboe::AudioStreamCallback {
public:
    bool bassBoost = false;
    bool audio3D = false;

    oboe::AudioStream *stream;

    void start() {
        oboe::AudioStreamBuilder builder;
        builder.setDirection(oboe::Direction::Output);
        builder.setPerformanceMode(oboe::PerformanceMode::LowLatency);
        builder.setSharingMode(oboe::SharingMode::Exclusive);
        builder.setFormat(oboe::AudioFormat::Float);
        builder.setChannelCount(oboe::ChannelCount::Stereo);
        builder.setCallback(this);
        builder.openStream(&stream);
        stream->requestStart();
    }

    oboe::DataCallbackResult onAudioReady(oboe::AudioStream *s, void *audioData, int32_t numFrames) {
        float *output = (float*)audioData;

        for (int i = 0; i < numFrames * 2; i += 2) {
            float left = output[i];
            float right = output[i + 1];

            // === BASS BOOST (simples low-shelf) ===
            if (bassBoost) {
                static float lowL = 0, lowR = 0;
                lowL = 0.8f * lowL + 0.2f * left;
                lowR = 0.8f * lowR + 0.2f * right;
                left += 3.0f * lowL;
                right += 3.0f * lowR;
            }

            // === 3D AUDIO (HRTF simulado) ===
            if (audio3D) {
                float mid = (left + right) * 0.5f;
                float side = (left - right) * 0.5f;
                left = mid + 0.7f * side;
                right = mid - 0.7f * side;
                // Aqui entra convolução com IRs (futuro)
            }

            output[i] = std::min(std::max(left, -1.0f), 1.0f);
            output[i + 1] = std::min(std::max(right, -1.0f), 1.0f);
        }
        return oboe::DataCallbackResult::Continue;
    }
};

AudioProcessor processor;

extern "C" {
    JNIEXPORT void JNICALL Java_com_eqmasterfree_AudioProcessor_start(JNIEnv*, jobject) {
        processor.start();
    }
    JNIEXPORT void JNICALL Java_com_eqmasterfree_AudioProcessor_setBassBoost(JNIEnv*, jobject, jboolean on) {
        processor.bassBoost = on;
    }
    JNIEXPORT void JNICALL Java_com_eqmasterfree_AudioProcessor_set3DAudio(JNIEnv*, jobject, jboolean on) {
        processor.audio3D = on;
    }
}
