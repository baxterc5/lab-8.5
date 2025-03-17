async function fetchBooks() {
  console.log("Fetching books using direct fetch...");

  try {
      let response = await fetch("https://wakyqsfhpzlbyaxgklzq.supabase.co/rest/v1/books?select=*", {
          headers: { apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indha3lxc2ZocHpsYnlheGdrbHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODE3MzIsImV4cCI6MjA1Nzc1NzczMn0.Mlwq8P6wHm7UvoJVUyQBcZlnr9WL8fB9KKlId_o6kqw" } // Replace with your actual anon key
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let books = await response.json();
      console.log("Fetched books:", books);

      if (!books || books.length === 0) {
          console.warn("No books found in the database.");
          return;
      }

      const bookList = document.getElementById("books");
      if (!bookList) {
          console.error("Element with ID 'books' not found in HTML.");
          return;
      }

      bookList.innerHTML = ""; // Clear existing content

      books.forEach((book) => {
          console.log(`Adding book: ${book.title} - ${book.author} - ${book.isbn}`);

          const li = document.createElement("li");
          li.textContent = `${book.title} - ${book.author} - ${book.isbn}`;
          bookList.appendChild(li);
      });

      console.log("All books added to the list.");
  } catch (error) {
      console.error("Fetch error:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchBooks);
