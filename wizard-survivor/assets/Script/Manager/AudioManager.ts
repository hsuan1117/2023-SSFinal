const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    private bgmLists: {[bgmName: string]: cc.AudioClip} = {};

    private effectLists: {[effectName: string]: cc.AudioClip} = {};

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

    // update (dt) {}
}
