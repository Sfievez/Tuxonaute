/*
File Name: note.service.ts
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is the service of the note.
Copyright (c) 2023 Tux Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import { Note } from "./note.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note) private notesRepository: Repository<Note>,
    ) {}

    async getAllNotes(): Promise<Note[]> {
        return await this.notesRepository.find();
    }

    async findOne(id: number): Promise<Note> {
        return await this.notesRepository.findOneBy({ id });
    }

    async createNote(note: Note) {
        this.notesRepository.save(note);
    }

    async deleteOneNoteById(id: string): Promise<void> {
        await this.notesRepository.delete(id);
    }

    async deleteAllNotes(): Promise<void> {
        await this.notesRepository.clear();
    }

    async editOneNoteById(id: number, note: Note): Promise<Note> {
        const editedNote = await this.notesRepository.findOneBy({ id });
        if (!editedNote) {
            throw new Error("Note not found");
        }
        editedNote.title = note.title;
        editedNote.description = note.description;
        await this.notesRepository.save(editedNote);
        return editedNote;
    }
}
