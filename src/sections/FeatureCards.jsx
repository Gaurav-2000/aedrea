import { abilities } from "../constants";
import FlowingMenu from "@/components/FlowingMenu";
const itemImages = [
  {
    text: "Idea",
    image: "/images/idea.jpg",
  },
  {
    text: "Innovation",
    image: "/images/innovation.jpg",
  },
  {
    text: "Creativity",
    image: "/images/creativity.jpg",
  },
  {
    text: "Branding",
    image: "/images/branding.jpg",
  },
];

const FeatureCards = () => {
  return (
    <div className="w-full padding-x-lg">
      <div className="mx-auto grid-3-cols">
        {abilities.map(({ imgPath, title, desc }) => (
          <div
            key={title}
            className="card-border rounded-xl p-8 flex flex-col gap-4"
          >
            <div className="size-14 flex items-center justify-center rounded-full">
              <img src={imgPath} alt={title} />
            </div>
            <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
            <p className="text-white-50 text-lg">{desc}</p>
          </div>
        ))}
      </div>
      <div
        style={{ height: "400px", position: "relative", marginTop: "100px" }}
      >
        <FlowingMenu
          items={itemImages}
          speed={15}
          textColor="#ffffff"
          bgColor="black"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#060010"
          borderColor="#ffffff"
        />
      </div>
    </div>
  );
};

export default FeatureCards;
