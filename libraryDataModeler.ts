type BookId = string | number;

type BookCategory = string;

type Book = {
  id: BookId;
  title: string;
  author: string;
  isAvailable: boolean;
  publishedYear: number;
  category?: BookCategory;
};

type MemberId = string | number;

type Member = {
  id: MemberId;
  name: string;
  email: string;
  phone?: string;
};

function displayBookInfo(book: Book): string {
  const categoryText = book.category ? `, category: ${book.category}` : '';

  return [
    `Book Information:`,
    `- id: ${book.id}`,
    `- title: ${book.title}`,
    `- author: ${book.author}`,
    `- isAvailable: ${book.isAvailable}`,
    `- publishedYear: ${book.publishedYear}`,
    `${categoryText ? `- ${categoryText.replace(', category: ', 'category: ')}` : ''}`.trim(),
  ]
    .filter(Boolean)
    .join('\n');
}

function isBookAvailable(book: Book): boolean {
  return book.isAvailable;
}

const books: Book[] = [
  {
    id: 1,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    isAvailable: true,
    publishedYear: 1999,
    category: 'Software Engineering',
  },
  {
    id: 'B-102',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isAvailable: false,
    publishedYear: 2008,
    category: 'Software Engineering',
  },
];

const members: Member[] = [
  {
    id: 10,
    name: 'Andi Wijaya',
    email: 'andi.wijaya@email.com',
    phone: '081234567890',
  },
  {
    id: 'M-21',
    name: 'Siti Aminah',
    email: 'siti.aminah@email.com',
  },
];

// Example usage (for demonstration)
for (const book of books) {
  console.log(displayBookInfo(book));
  console.log(`Status: ${isBookAvailable(book) ? 'Available' : 'Not Available'}`);
  console.log('---');
}

// Members array is declared to satisfy the requested data model creation.
void members;

