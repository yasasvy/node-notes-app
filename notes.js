const fs = require('fs')
const chalk  = require('chalk')

const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( note => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green("New note added!"))
    } else {
        console.log(chalk.red("Note title taken!"))
    }
   
}

const removeNote = (title) => {
    const notes= loadNotes()
    const duplicateNotes = notes.filter( note => note.title !== title)
    if (notes.length >= duplicateNotes.length) {
        saveNotes(duplicateNotes)
        console.log(chalk.green("Note removed"))
    } else {
        console.log(chalk.red("No note found"))
    }
}

const listNotes = () => {
    const notes = loadNotes()

     console.log(chalk.inverse("Your notes"))

     notes.forEach((note) => console.log(note.title))
}

const saveNotes =  (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () =>  {
    try { 
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson);
    } catch (e) {
        return []
    }
    
}

const readNote = (title) => {
    const notes = loadNotes()

    const requiredNote = notes.find(note => note.title === title)
    if (requiredNote) {
        console.log(chalk.inverse(requiredNote.title))
        console.log(chalk(requiredNote.body))
    } else {
        console.log(chalk.red("No note found"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}