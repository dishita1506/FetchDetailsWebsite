const getPredictedAge=async(name:string)=>{
    const res = await fetch(`https://api.agify.io/?name=${name}`);
    return res.json();
}

const getPredictedGender=async(name:string)=>{
    const res = await fetch(`https://api.genderize.io/?name=${name}`);
    return res.json();
}

const getPredictedCountry = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`);
  return res.json();
};
interface Params{
    params:{name:string};
}

export default async function Page({params}:Params){
    const ageData=getPredictedAge(params.name);
    const genderData=getPredictedGender(params.name);
    const countryData=getPredictedCountry(params.name);

    const [age,gender,country]=await Promise.all([
        ageData,
        genderData,
        countryData
    ])

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4 shadow-md bg-white rounded-md font-semibold mb-4 text-black">
          <div className="text-blue-600 text-2xl">Personal Information</div>
           <div>Name:{params.name}</div>
          <div>Age : {age?.age}</div>
          <div>Gender : {gender?.gender}</div>
          <div>Nationality : {country?.country[0]?.country_id}</div>
        </div>
      </div>
    );
}