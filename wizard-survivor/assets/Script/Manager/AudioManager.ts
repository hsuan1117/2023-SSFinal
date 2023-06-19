const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    private bgmLists: {[bgmName: string]: cc.AudioClip} = {};

    private effectLists: {[effectName: string]: cc.AudioClip} = {};

    public get bgmVolume() { return cc.audioEngine.getMusicVolume(); }
    public get effectVolume() { return cc.audioEngine.getEffectsVolume(); }
    public set bgmVolume(volume: number) { cc.audioEngine.setMusicVolume(volume); }
    public set effectVolume(volume: number) { cc.audioEngine.setEffectsVolume(volume); }

    private _bgmVolumeBeforeMute: number = 1;
    private _effectVolumeBeforeMute: number = 1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.resources.loadDir("AudioClip/BGM", cc.AudioClip, (err, clips: cc.AudioClip[]) => {
            for (const clip of clips) {
                this.bgmLists[clip.name] = clip;
            }
        });

        cc.resources.loadDir("AudioClip/Effect", cc.AudioClip, (err, clips: cc.AudioClip[]) => {
            for (const clip of clips) {
                this.effectLists[clip.name] = clip;
            }
        });
    }

    // mute 會把音量調成 0，但會記住原本的音量，unmute 會把音量調回原本的音量
    public mute(){
        this._bgmVolumeBeforeMute = this.bgmVolume;
        this._effectVolumeBeforeMute = this.effectVolume;
        this.bgmVolume = 0;
        this.effectVolume = 0;
    }

    // mute 會把音量調成 0，但會記住原本的音量，unmute 會把音量調回原本的音量
    public unmute(){
        this.bgmVolume = this._bgmVolumeBeforeMute;
        this.effectVolume = this._effectVolumeBeforeMute;
    }

    public stopBGM(){
        cc.audioEngine.stopMusic();
    }

    public playEffect(effectName: string){
        cc.audioEngine.playEffect(this.effectLists[effectName], false);
    }
    public playBGM(bgmName: string, loop: boolean = true){
        this.stopBGM();
        cc.audioEngine.playMusic(this.bgmLists[bgmName], loop);
    }
}
