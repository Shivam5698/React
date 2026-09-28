// import React from 'react'
import { Container,PostForm } from "../components"

function AddPost() {
  return (
    <div className="page-enter w-full flex-1 py-12 md:py-16">
    <Container>
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold text-(--primary)">Creator studio</p>
        <h1 className="text-3xl font-bold text-(--text-h)">Write a post</h1>
        <p className="mt-3 text-(--text-muted)">Shape your idea into a story worth sharing.</p>
      </header>
        <PostForm/>
        </Container>    
    </div>
  )
}

export default AddPost