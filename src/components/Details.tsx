type DetailsProps = {
  title: string;
  description: string;
};
const Details = ({ title, description }: DetailsProps) => {
  return (
    <section className="py-10 px-4 lg:py-16 lg:px-32">
      <div className="container mx-auto">
        <h2 className="font-playfair text-3xl lg:text-5xl font-normal text-center mb-6">
          {title}
        </h2>
        <p className="font-quicksand text-2xl leading-normal text-gray-600 text-center mb-8">
          {description}
        </p>
      </div>
    </section>
  );
};

export default Details;
