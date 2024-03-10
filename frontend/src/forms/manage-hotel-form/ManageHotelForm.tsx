import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";


export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
}

type Props = {
  onSave: (HotelFormData: FormData) => void;
  isLoading: boolean;
}


const ManageHotelForm = ({onSave, isLoading}: Props) => {
  const formMethods = useForm<HotelFormData>();  
  const {handleSubmit} = formMethods;
  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    })
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {  // Array to convert fileList type to an array
      formData.append("imageFiles", imageFile)
    })

     onSave(formData); 
  });
  return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection />
            <TypeSection />
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />
            <span className="flex justify-end">
              <button type="submit" disabled={isLoading}/*prevent creating hotel twice and reduce load on server, always disable buttons when loading */
              className="disabled:bg-gray-500 bg-blue-500 text-white py-2 px-4 font-bold hover:bg-blue-300">
                {isLoading ? "Saving..." : "Save" }</button>
            </span>

        </form> 
    </FormProvider>
  )
}

export default ManageHotelForm
