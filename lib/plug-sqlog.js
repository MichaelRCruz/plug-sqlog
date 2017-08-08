'use babel';

import PlugSqlogView from './plug-sqlog-view';
import { CompositeDisposable } from 'atom';
import * as fs from 'fs';

export default {

  plugSqlogView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // this.plugSqlogView = new PlugSqlogView(state.plugSqlogViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.plugSqlogView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'plug-sqlog:writeDiary': () => this.writeDiary(),
      'plug-sqlog:testFunction': () => this.testFunction()
    }));
    // this.subscriptions.add(atom.commands.add('atom-workspace', {
    //   'plug-sqlog:testFunction': () => this.testFunction()
    // }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    this.subscriptions.dispose();
    // this.plugSqlogView.destroy();
  },

  // serialize() {
  //   return {
  //     plugSqlogViewState: this.plugSqlogView.serialize()
  //   };
  // },

  writeDiary() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      console.log('PATH', process.cwd());
      fs.open('/Users/mrcruz/code/sqlog/diary.txt', 'a', function(err, fd) {
        if (err) {
          console.log("ERROR !! " + err);
        } else {
            fs.write(fd, '\n\n' + selection, function(err) {
              if (err) console.log("ERROR !! " + err);
              fs.close(fd, function() {
                atom.notifications.addSuccess('Snippet inserted into Diary.');
                console.log('written success');
              })
            });
          }
      });
    }
  },

  testFunction() {
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      console.log('sup, yo.')
      atom.notifications.addSuccess('test function works: ' + selection);
    }
  }

};
