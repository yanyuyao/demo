import CoverImage from '@/app/cover-image';

export default function BannerSingle({}: {}) {
  return (
    <div className="relative z-0 flex min-h-[calc(100vh-30vh)] items-center   ">
      <div className="mx-auto text-center relative w-full ">       
        <CoverImage
        title="Banner"
        url="https://quandx.com/wp-content/uploads/2016/06/home-slide1.jpg"
      />
      </div>
    </div>
  );
}
