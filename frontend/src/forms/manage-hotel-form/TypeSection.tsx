import { useFormContext } from "react-hook-form"
import{hotelTypes} from "../../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
    const {register, watch, formState:{errors}} = useFormContext<HotelFormData>();
    const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type, index) => (
            <label key={index} className={`${typeWatch === type ? "bg-blue-300" : "bg-gray-300"} text-center font-semibold text-sm rounded-full px-4 p-2 cursor-pointer`}>
                <input type="radio" className="hidden" value={type} {...register("type", {required: "This field is required"})}/>
                <span>{type}</span>
             </label>
        ))}

      </div>
      {errors.description && <span className="text-red-500 text-sm font-bold">
      {errors.description.message}
      </span>}
    </div>
  )
} 

export default TypeSection 