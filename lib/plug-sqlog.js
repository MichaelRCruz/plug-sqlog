'use babel';

import PlugSqlogView from './plug-sqlog-view';
import { CompositeDisposable } from 'atom';

export default {

  plugSqlogView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.plugSqlogView = new PlugSqlogView(state.plugSqlogViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.plugSqlogView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'plug-sqlog:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.plugSqlogView.destroy();
  },

  serialize() {
    return {
      plugSqlogViewState: this.plugSqlogView.serialize()
    };
  },

  toggle() {
    console.log('PlugSqlog was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
