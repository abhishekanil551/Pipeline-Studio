# Pipeline Builder

A visual pipeline builder with dynamic nodes and DAG validation.

## Features
- Node abstraction system
- Dynamic TextNode with variable parsing
- Undo/Redo (Zustand)
- Backend DAG validation (FastAPI)

## Tech Stack
- React + React Flow
- Zustand
- FastAPI

## Run

Frontend:
npm install
npm start

Backend:
uvicorn main:app --reload