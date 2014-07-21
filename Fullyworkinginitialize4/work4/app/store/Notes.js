Ext.define('NotesApp.store.Notes', {
	extend: 'Ext.data.Store',
	requires: 'Ext.data.proxy.LocalStorage',
	config: {
		model: 'NotesApp.model.Note',

	// 	data: [
	// 		{
	// 			title: 'Note 1',
	// 			narrative: 'Narrative 1'
	// 		},
	// 		{
	// 			title: 'Note 2',
	// 			narrative: 'Narrative 2'
	// 		},
	// 		{
	// 			title: 'Note 3',
	// 			narrative: 'Narrative 3'
	// 		},
	// 		{
	// 			title: 'Note 4',
	// 			narrative: 'Narrative 4'
	// 		},
	// 		{
	// 			title: 'Note 5',
	// 			narrative: 'Narrative 5'
	// 		},
	// 		{
	// 			title: 'Note 6',
	// 			narrative: 'Narrative 6'
	// 		}
	// 	],

		proxy: {
			type: 'localstorage',
			id: 'notes-app-store'
		},
		sorters: [
			{
				property: 'dateCreated',
				direction: 'DESC'
			}
		],
		grouper: {
			sortProperty: 'dateCreated',
			direction: 'DESC',
			groupFn: function(record){
				if(record && record.data.dateCreated){
					return record.data.dateCreated.toDateString();
				}else{
					return '';
				}
			}
		}
	}
});