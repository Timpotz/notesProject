const { addNoteHandler, getAllNotesHandler,getNotebyID, editNoteByIdHandler,deleteNoteByIdHandler} = require("./handler");

const routes=[
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        options: {
          cors: {
            origin: ['*'],
          },
        },
      },
    { 
        method: 'GET',
        path: '/',
        handler: (request, h) => {
        return 'This is homepage NIGGA';
        },

    },
    { 
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotebyID,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    }

]


module.exports = routes;
//