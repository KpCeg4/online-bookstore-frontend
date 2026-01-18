import { Carousel } from "react-bootstrap";
import carouselBg from "../assets/carousel/car-img.jpg";

export default function FeaturedCarousel({ books = [] }) {
  if (!books.length) return null;

  const shuffled = [...books].sort(() => 0.5 - Math.random());

  const bestSellers = shuffled.slice(0, 9);
  const newArrivals = shuffled.slice(9, 15);

  const slides = [
    { title: "Best Sellers", items: bestSellers.slice(0, 3) },
    { title: "New Arrivals", items: newArrivals.slice(0, 3) },
    { title: "Best Sellers", items: bestSellers.slice(3, 6) },
    { title: "New Arrivals", items: newArrivals.slice(3, 6) },
    { title: "Best Sellers", items: bestSellers.slice(6, 9) }
  ];

  return (
    <Carousel
      interval={10000}
      ride="carousel"
      pause={false}
      controls={false}
      indicators={true}
      className="featured-carousel mb-5"
    >
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <div
            className="featured-slide-bg"
            style={{
              backgroundImage: `url(${carouselBg})`
            }}
          >
            <div className="featured-slide-inner">
              <div className="featured-title">
                {slide.title}
              </div>

              <div className="featured-books">
                {slide.items.map(book => (
                  <div className="featured-book-card" key={book.id}>
                    <img
                      src={book.imageUrl || "https://via.placeholder.com/160"}
                      alt={book.title}
                    />
                    <div className="featured-book-name">
                      {book.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
