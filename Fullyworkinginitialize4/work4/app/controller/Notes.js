Ext.define("NotesApp.controller.Notes", {
	extend: 'Ext.app.Controller',
	// config: {
	// 	refs: {
	// 		newNoteBtn: "#new-note-btn"
	// 	},
	// 	control: {
	// 		newNoteBtn:{
	// 			tap: "onNewNote"
	// 		}
	// 	}
	// },
	// onNewNote: function(){
	// 	console.log("onNewNote");
	// },

	config: {
		refs: {
			notesListContainer: 'noteslistcontainer',
			noteEditor: 'noteeditor'
		},
		control: {
			notesListContainer: {
				newNoteCommand: 'onNewNoteCommand',
				editNoteCommand: 'onEditNoteCommand'
			},
			noteEditor: {
				saveNoteCommand: 'onSaveNoteCommand',
				deleteNoteCommand: 'onDeleteNoteCommand',
				backToHomeCommand: 'onBackToHomeCommand'
			}
		}
	},
	slideLeftTransition: {
		type: 'slide',
		direction: 'left'
	},
	slideRightTransition: {
		type: 'slide',
		direction: 'right'
	},
	onBackToHomeCommand: function(){
		console.log("onBackToHomeCommand");
		this.activateNotesList();
	},
	onDeleteNoteCommand: function(){
		console.log("onDeleteNoteCommand");

		var noteEditor = this.getNoteEditor();
		var currentNote = noteEditor.getRecord();
		var notesStore = Ext.getStore("Notes");

		notesStore.remove(currentNote);
		notesStore.sync();

		this.activateNotesList();
	},
	onEditNoteCommand: function(list, record){
		console.log("onEditNoteCommand");
		this.activateNoteEditor(record);
	},
	onSaveNoteCommand: function(){
		console.log("onNewNoteCommand");

		var noteEditor = this.getNoteEditor();
		var currentNote = noteEditor.getRecord();
		var newValues = noteEditor.getValues();

		currentNote.set("title", newValues.title);
		currentNote.set("narrative", newValues.narrative);

		var errors = currentNote.validate();

		if(!errors.isValid()){
			Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
			currentNote.reject();
			return;
		}

		var notesStore = Ext.getStore("Notes");

		if(null == notesStore.findRecord('id', currentNote.data.id)){
			notesStore.add(currentNote);
		}

		notesStore.sync();

		notesStore.sort([{
			property: 'dateCreated',
			direction: 'DESC'
		}]);

		this.activateNotesList();
	},
	onNewNoteCommand: function(){
		console.log("onNewNoteCommand");

		var now = new Date();
		var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

		var newNote = Ext.create("NotesApp.model.Note", {
			id: noteId,
			dateCreated: now,
			title: '',
			narrative: ''
		});
		this.activateNoteEditor(newNote);
	},
	getRandomInt: function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	activateNotesList: function(){
		Ext.Viewport.animateActiveItem(this.getNotesListContainer(), this.slideRightTransition);
	},
	activateNoteEditor: function(record){
		var noteEditor = this.getNoteEditor();
		noteEditor.setRecord(record);
		Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
	},
	launch: function(){
		this.callParent();
		Ext.getStore("Notes").load();
		console.log("launch");
	},
	init: function(){
		this.callParent();
		console.log("init");
	}
});