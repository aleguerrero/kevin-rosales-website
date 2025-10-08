export default function AboutPage() {
  return (
    <div className="p-4 flex flex-row">
      <div className="flex flex-col justify-center items-center">
        <div>Represented by</div>
        <div>Landia</div>
        <div className="flex flex-row">
          <img src={`/instagramlogo.png`} className="w-[30px] mr-[10px]" />
          <img src={`/vimeologo.png`} className="w-[30px]" />
        </div>
      </div>
      <div className="ml-[20px] w-1/4">
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
