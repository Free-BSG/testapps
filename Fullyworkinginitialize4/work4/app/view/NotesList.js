Ext.define('NotesApp.view.NotesList', {
	extend: 'Ext.dataview.List',
	alias: 'widget.noteslist',
	config: {
		scrollable: 'vertical'
	},
	config: {
		loadingText: 'Loading Notes ...',
		emptyText: '</pre><div class="\&quot;notes-list-empty-text\&quot;">No notes found.</div><pre>',
		onItemDisclosure: true,
		grouped: true,
		itemTpl: '</pre><div class="\&quot;list-item-title\&quot;">{title}</div><div class="\&quot;list-item-narrative\&quot;">{narrative}</div><pre>'
	}
});