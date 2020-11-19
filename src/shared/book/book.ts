export default interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher?: string;
    description: string;
    publishedDate: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}
