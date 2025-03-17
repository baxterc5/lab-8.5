import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://wakyqsfhpzlbyaxgklzq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indha3lxc2ZocHpsYnlheGdrbHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODE3MzIsImV4cCI6MjA1Nzc1NzczMn0.Mlwq8P6wHm7UvoJVUyQBcZlnr9WL8fB9KKlId_o6kqw";
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchBooks() {
    console.log("Fetching books from Supabase...");

    let { data: books, error } = await supabase.from("books").select("*");

    if (error) {
        console.error("Error fetching books:", error);
        return;
    }

    console.log("Fetched books:", books);

    if (!books || books.length === 0) {
        console.warn("No books found in the database.");
        return;
    }

    let bookTable = document.getElementById("books-table-body");
    if (!bookTable) {
        console.error("Element with ID 'books-table-body' not found.");
        return;
    }

    bookTable.innerHTML = "";

    books.forEach((book) => {
        console.log("Adding book:", book);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title || "Unknown Title"}</td>
            <td>${book.author || "Unknown Author"}</td>
            <td>${book.isbn || "Unknown ISBN"}</td>
        `;
        bookTable.appendChild(row);
    });

    console.log("All books added to the table.");
}

document.addEventListener("DOMContentLoaded", fetchBooks);
