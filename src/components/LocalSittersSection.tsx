import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface LocalSitter {
  id: number | string;
  profile_image: string;
  full_name: string;
  average_rating: string;
  total_reviews: number;
}

interface LocalSittersSectionProps {
  localSitters: LocalSitter[];
  totalLocalSitters: number;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const handleSeeAll = () => {  
   localStorage.setItem('service_id', JSON.stringify(0))
   localStorage.removeItem("pet_id")
   localStorage.removeItem("repeatition")
   localStorage.removeItem("start_date")
   localStorage.removeItem("end_date")
   localStorage.removeItem("time_type")
   localStorage.removeItem("rating")
   localStorage.removeItem("city")
   localStorage.removeItem("weekIds")
   localStorage.removeItem("location")
   localStorage.removeItem("sizes")
   localStorage.removeItem("slots")

}

const LocalSittersSection: FC<LocalSittersSectionProps> = ({ localSitters, totalLocalSitters }) => {
  return (
    <>
      {localSitters.length > 0 && (
        <section className="local_sitter_section">
          <div className="container mx-auto px-4">
            <div className="size-full text-center">
              <h2 className="text-2xl md:text-3xl lg:text-5xl text-[#0d3c4b]">Meet local sitters</h2>
            </div>

            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay
              autoPlaySpeed={3000}
              containerClass="carousel-container"
              itemClass="carousel-item-padding"
            >
              {localSitters.map((localSitter) => (
                <Link 
                  href={`/sitter-details?id=${btoa(String(localSitter.id))}`} 
                  className="local_sitter_box1 shadow-md" 
                  key={localSitter.id}
                >
                  <div className="img_area">
                    <Image 
                      src={localSitter.profile_image} 
                      alt={localSitter.full_name} 
                      width={500} 
                      height={300} 
                      
                    />
                  </div>
                  <div className="text_area">
                    <h2>{localSitter.full_name}</h2>
                    <p>
                      <span>
                        <i className="fa-solid fa-star"></i> {localSitter.average_rating}
                      </span> 
                      ({localSitter.total_reviews})
                    </p>
                  </div>
                </Link>
              ))}
            </Carousel>

            {totalLocalSitters > 4 && (
              <div className="w-full mt-8 text-center">
                <Link  onClick={handleSeeAll}  href="/see-all" className="but_style1">See all</Link>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default LocalSittersSection;
