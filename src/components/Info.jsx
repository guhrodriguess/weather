import { CircleNotch, ThermometerSimple } from "phosphor-react";

export default function Info({ showWeather, loading, apiData }) {
  return (
    <div
      className={`${
        showWeather ? "h-full" : "h-0"
      } duration-300 delay-75 overflow-hidden`}
    >
      {loading ? (
        <div className="grid h-full place-items-center">
          <CircleNotch
            weight="bold"
            size={32}
            className="mx-auto animate-spin text-textPrimary"
          />
        </div>
      ) : (
        showWeather && (
          <div className="flex flex-col justify-center gap-6 my-10 text-center">
            {apiData && (
              <p className="text-xl text-textPrimary">
                {apiData?.name + ", " + apiData?.sys?.country}
              </p>
            )}
            <img
              src={showWeather[0]?.img}
              alt="Weather image"
              className="mx-auto w-52"
            />
            <h3 className="text-2xl normal-case text-textPrimary">
              {apiData !== null ? (
                apiData?.weather[0]?.description
              ) : (
                <span>Local não encontrado</span>
              )}
            </h3>
            {apiData && (
              <>
                <div className="flex items-center justify-center gap-2">
                  <ThermometerSimple
                    size={32}
                    weight="bold"
                    className="text-textPrimary"
                  />
                  <h2 className="text-4xl text-textSecondary">
                    {Math.floor(apiData?.main?.temp)}ºC
                  </h2>
                </div>
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}
