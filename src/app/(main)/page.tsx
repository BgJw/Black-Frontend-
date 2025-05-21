import BackgroundVideo from "@/components/backgroundVideo";

const Home = () =>  {

 
  return (
      <main >
        {/* <BackgroundVideo /> */}
        <div className="h-screen w-full z-10 flex justify-center items-center relative delay-2000 duration-500 transition-all">
          <div>
            <h1 className="text-[40px]">
              Witamy w Pralnia do domu
            
            </h1>
          </div>
        </div>
      </main>
  )
}



export default Home;