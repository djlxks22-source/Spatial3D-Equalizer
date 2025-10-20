#include <Superpowered/Superpowered.h>
#include <SuperpoweredAdvancedAudioPlayer.h>
#include <SuperpoweredEcho.h>
#include <SuperpoweredFilter.h>

static Superpowered::AdvancedAudioPlayer *player;
static Superpowered::Filter *bassFilter;

extern "C" {
    JNIEXPORT void JNICALL Java_com_eqmaster3d_SuperpoweredModule_init(JNIEnv *env, jobject thiz) {
        player = new Superpowered::AdvancedAudioPlayer(44100, 0);
        bassFilter = new Superpowered::Filter(Superpowered::Filter::LowPass, 44100);
        bassFilter->frequency = 150;
    }

    JNIEXPORT void JNICALL Java_com_eqmaster3d_SuperpoweredModule_set79(JNIEnv *env, jobject thiz, jboolean enabled) {
        bassFilter->enable(enabled);
    }

    JNIEXPORT void JNICALL Java_com_eqmaster3d_SuperpoweredModule_set3DAudio(JNIEnv *env, jobject thiz, jboolean enabled) {
        // Aqui vai seu 3D com IRs, crossfeed, etc
    }
}
