export const metadata = {
    title: 'About',
  };

export default function AboutPage() {
  return (
    <div className="p-8 flex flex-row max-md:flex-col w-full pt-24 fade-in-container">
      <div className="flex flex-col justify-center items-center">
        <div>Represented by</div>
        <div>Landia</div>
        <div className="flex flex-row pt-4 ">
          <a href="https://www.instagram.com/kevrosales_/" target="_blank" rel="noopener noreferrer"><img src={`/instagramlogo.png`} className="w-[30px] mr-[10px]" /></a>
          <a href="https://vimeo.com/kevrosales" target="_blank" rel="noopener noreferrer"><img src={`/vimeologo.png`} className="w-[30px]" /></a>
        </div>
      </div>
      <div className="ml-[20px] w-1/4 max-md:w-full max-md:ml-[0px] max-md:p-[20px] text-justify font-extralight text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    </div>
  );
}
