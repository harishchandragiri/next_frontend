import Hero from "@/components/Hero";
import Product from "@/components/Product";


export default function Home() {
  return (
    <div>
       <Hero
        title="Discover the Best Deals on Your Favorite Products"
        description="Shop the latest collections with exclusive discounts. Get fast delivery and easy returns for a seamless shopping experience."
      />
      <Product/>
    </div>
  );
}
