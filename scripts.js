import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://wakyqsfhpzlbyaxgklzq.supabase.co";
const supabaseKey = "YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indha3lxc2ZocHpsYnlheGdrbHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODE3MzIsImV4cCI6MjA1Nzc1NzczMn0.Mlwq8P6wHm7UvoJVUyQBcZlnr9WL8fB9KKlId_o6kqw";
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchBooks() {
    let { data: books, error } = await supabase.from("books").select("*");

    if (error) {
        console.error("Error fetching books:", error);
        return;
    }
    let bookTable = document.getElementById("books-table-body");

    for (let book of books) {
        bookTable.innerHTML += `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
        </tr>`;
    }
}
document.addEventListener("DOMContentLoaded", fetchBooks);
