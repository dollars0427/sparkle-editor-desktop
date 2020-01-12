<template>
  <div id="wrapper">
    <main>
      <div id="sparkle-editor">
        <ckeditor ref="editor" :editor="editor" :config="config" @input="onEditorInput"></ckeditor>
      </div>
    </main>
  </div>
</template>

<script>
import Store from 'electron-store';
import CKEditor from '@ckeditor/ckeditor5-vue';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import keyDownVoice from '../assets/audio/key_down.mp3';
import keyUpVoice from '../assets/audio/key_up.mp3';
import returnVoice from '../assets/audio/return.mp3';
const store = new Store();
  export default {
    name: 'writer',
    components: {
      ckeditor: CKEditor.component
    },
    mounted(){
      const editor = this.$refs.editor.$el;
      editor.addEventListener('keydown', this.handleKeyDown);
      editor.addEventListener('keyup', this.handleKeyUp);
    },
    data() {
      return {
        editor: BalloonEditor,
        config: {
          toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
          initialData: store.get('content'),
        },
        store,
      };
    },
    methods:{
      handleKeyDown(e){
        const key_down = new Audio(keyDownVoice);
        const return_sound = new Audio(returnVoice);
        key_down.play();
        if (e.keyCode === 13) {
          return_sound.pause();
          return_sound.currentTime = 0.
          return_sound.play();
        }
      },
      handleKeyUp(e){
        const key_up = new Audio(keyUpVoice);
        key_up.play();
      },
      onEditorInput(){
        const editorContent = this.$refs.editor.$el.innerHTML;
        this.store.set('content', editorContent);
      },
    },
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #sparkle-editor{
    height: 100vh;
    .ck{
      height: 100vh;
    }
  }
</style>
