"use client";
import React, {useEffect, useState} from 'react';
import Headertop from '@/components/header';
import Footer from '@/components/footer';
import './subscription.css';
import useNoAuthCheck from '@/hooks/noAuthentication';
import { SUBCRIPTION_LIST} from '@/constants/constants';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import useToast from "@/hooks/helperToast";
import LoaderSpinner from '@/components/loader';
import { Languages } from 'lucide-react';
import { json } from 'stream/consumers';

interface Details {
  programId: number;
  programName: string;
  image: string;
  year: string;
  price: number;
  episodeNumber: string;
  languages:{
    languageId: number;
    programId: number;
    name: string
    episodeCount: number;
    yearWisePrice:{
      year: string
      price: number;
    }[];
  }[];
    
}
type AmountDetail = {
  programId: string;
  price: number;
  year: number;
};
export default function TermsOfService() {
    useNoAuthCheck();
   

    const [totalPages, setTotalPages] = useState<number>(1);
    const [subcriptionList, setSubcriptionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceDetails, setPriceDetails] = useState<unknown[]>([]);
    const [checkBoxData, setCheckBoxData] = useState<unknown[]>([]);
    const [SelectLanguageData, setSelectLanguageData] = useState<unknown[]>([]);
    const router = useRouter();
    const { showErrorToast } = useToast();
    const [accessPageName, setAccessPageName] = useState('');
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [amountDetails, setAmountDetails] = useState<AmountDetail[]>([]);
    const [details, setDetails] = useState<Details | null>(null)

    
  useEffect(() => {
        const accessPage = localStorage.getItem('accessPageName');
        if(accessPage){
            setAccessPageName(accessPage)
        }
        const fetchSubscriptionList = async () => {
            setLoading(true);

          const token = localStorage.getItem('token');
          
          try {
            const result = await fetch(
              `${SUBCRIPTION_LIST}?page=${totalPages}`,
              {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            if (!result.ok) throw new Error('Failed to fetch profile data');
    
            const res = await result.json();
            if (res.status === 200) {
              setSubcriptionList(res.data.subscriptionList);
              setTotalPages(1);
            }else if (res.status === 401) {
                showErrorToast(res.msg);
                router.push('/signin');
                localStorage.clear();
              } else {
                showErrorToast(res.msg || 'Error fetching subcription');
              }
          } catch (error) {
            console.error('Error fetching subcription:', error);

          } finally {
            setLoading(false);
          }
        };
      
        fetchSubscriptionList();
    }, []);
      
  const handleCheckBoxData = (details: any) => {
  setCheckBoxData((prevDetails) => {
    if (!Array.isArray(prevDetails)) {
      return [details];
    }
    const exists = prevDetails.some((item: any) => item.programId === details.programId);
    let updatedDetails;
    if (exists) {
      updatedDetails = prevDetails.filter((item: any) => item.programId !== details.programId);
      setSelectLanguageData((prevs) => prevs.filter((item: any) => item.programId !== details.programId));
    } else {
      updatedDetails = [...prevDetails, details];
    }
    
    setPriceDetails(updatedDetails); // Directly setting updatedDetails
    return updatedDetails;
  });
  const updatedLanguages = SelectLanguageData.some((item: any) => item.programId === details.programId);
  setDetails(null)

  if (updatedLanguages) {
   
    const data = { ...details, languages: [] };

    const languageDetails = SelectLanguageData.find((item: any) => item.programId === details.programId);
    if (languageDetails) {
      data.languages = [languageDetails];
    }
    setDetails(data)
  }
  };

  useEffect(() => {
    console.log('use effec hook', details)
    const updatedLanguages = SelectLanguageData.some((item: any) => (details && item.programId === details.programId));
    if (updatedLanguages) {
      setPriceDetails((prevProgram) => {
        if (!Array.isArray(prevProgram)) return [details];
        
       
        const updatedPriceDetail = prevProgram.map((program: any) => {
          if (details && program.programId === details.programId) {
            console.log(details.languages, 'details.languages===')

            return { ...program, languages: details.languages };
          }
          return program;
        });
  
        console.log("Updated Price Details:", updatedPriceDetail);
        return updatedPriceDetail;
      });
    }
    else{
      let chechboxData = checkBoxData.some((item: any) => (details && item.programId === details.programId));
      console.log(chechboxData,'chechboxData----')
      if(chechboxData){
        setCheckBoxData((prevs) => prevs.filter((item: any) => details && item.programId !== details.programId));
        setPriceDetails((prevs) => prevs.filter((item: any) => details && item.programId !== details.programId))
      }
     

    }
    
  }, [checkBoxData,SelectLanguageData]);


  const handleSelectLanguageData = (_details: any, _programId: any, subcriptionDetails:any) => {
    console.log('subcriptionDetails', subcriptionDetails)
      _details.programId = _programId;
    
      setSelectLanguageData((prevs) => {
        if (!Array.isArray(prevs)) {
          return [_details];
        }
    
        // Check if the same language is already selected for the program
        const exists = prevs.some(
          (item: any) => item.programId === _programId && item.languageId === _details.languageId
        );
    
    
        let updatedDetails;
        if (exists) {
          updatedDetails = prevs.filter(
            (item: any) => !(item.programId === _programId && item.languageId === _details.languageId)
          );
        } else {
          updatedDetails = prevs.filter((item: any) => item.programId !== _programId);

          updatedDetails.push(_details);
        }
        return updatedDetails;
      });
     
      setDetails(null)
      const data = { ...subcriptionDetails, languages: [_details] };
     

      setCheckBoxData((prevDetails) => {
        if (!Array.isArray(prevDetails)) {
          return [subcriptionDetails];
        }
        const exists = prevDetails.some((item: any) => item.programId === subcriptionDetails.programId);
        let updatedDetails;
        if (exists) {
          const languageExists = prevDetails.some((item: any) => item.programId === subcriptionDetails.programId);
          
          if(!languageExists){
            updatedDetails = prevDetails.filter((item: any) => item.programId !== subcriptionDetails.programId);
           }
           else{
            console.log('data', prevDetails)
            updatedDetails = prevDetails

           }
        } else {
         
          updatedDetails = [...prevDetails, subcriptionDetails];
        }
        setDetails(data)
        setPriceDetails(updatedDetails);

        return updatedDetails;
      });
     
  };

  const handleSkip = () => {
    if(accessPageName && accessPageName == 'payment'  || accessPageName == 'signup'){
    router.push("/congratulation");
    localStorage.removeItem('accessPageName');
    }else{
     router.push("/")
    }

  }

  const handlePriceDetails = (price: any, programId: any) => {
    
    const data = { programId: programId, price: price.price , year: price.year};
    
    setAmountDetails((prevAmount) => {
      if (!Array.isArray(prevAmount)) return [...prevAmount,data];
      const exist = prevAmount.some((item: any) => item.programId === programId && item.year === price.year);
      const exists = prevAmount.some((item: any) => item.programId === programId && item.year !== price.year);
 

      let updatedDetails;
  
      if (exists) {
        updatedDetails = prevAmount.map((program: any) => {
          if (program.programId === programId) {
            return { ...program,  price: data.price, year: data.year};
          }
          return program;
        });
  
      }else if(exist){
        updatedDetails = prevAmount.filter((program: any) => program.programId !== programId && program.year !== data.year)
      } else {
        updatedDetails = [...prevAmount, data];
      }
       return updatedDetails;
    });
  };

  useEffect(() => {    
    const total = amountDetails.reduce((accumulator, currentItem:any) => accumulator + currentItem.price, 0);
    setTotalAmount(total); 
  }, [amountDetails]); 

    return (
        <>
            <Headertop />
            {loading ? <LoaderSpinner /> : (
             <> <div className='body_section'>
                <div className='container'>
                    <h2 className='page-heading'>Subscription</h2>
                    <div className='w-full text-right mb-4'>
                                <button className="text-themeyellow font-extrabold text-lg" onClick={handleSkip}>Skip</button>
                     </div>
                    <div className="w-full grid md:grid-cols-3 gap-6 mt-3">
                        <div className="space-y-4 col-span-2">
                            {subcriptionList.map((subcription:any) => (
                            <div key={subcription.programId} className={`border-2 border-[#CDCDCD] rounded-lg p-4 bg-white flex items-center shadow-md relative pr-5 ${checkBoxData.some((item:any) => (item.programId === subcription.programId)) ? 'subscription-active' : ''}`}>
                                <input type="checkbox" className="form-checkbox text-themeyellow border-2 border-gray-400 rounded absolute top-4 right-4" onClick={()=> handleCheckBoxData(subcription)} checked={checkBoxData.some((item:any) => (item.programId === subcription.programId))}  /> 

                                <Image src={subcription.image} alt="Program Image" className="w-36 h-28 rounded-lg object-cover" height={50} width={50} />
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-semibold">{subcription.programName}</h3>
                                    <div className="flex items-center justify-between mt-1 border-b pb-1">
                                        <p className="text-gray-500 text-sm">{subcription.episodeNumber} Episodes</p>
                                        <p className="text-[#005895] font-bold">${subcription.price}<span className=" font-normal">/ {subcription.year} year</span></p>
                                    </div>

                                    {/* Select Language Section */}
                                    <div className="mt-4 flex space-x-2 items-center" >
                                        <p>Select language:</p>
                                        <div className="flex space-x-2">
                                            {subcription.languages.map((language:any, index:any) =>(
                                           
                                            <label className="cursor-pointer" key={index}>
                                                <input type="radio" value={language.name} className="hidden peer" onClick={() => handleSelectLanguageData(language, subcription.programId, subcription)} checked={SelectLanguageData.some((item:any) => (item.languageId === language.languageId && item.programId === subcription.programId))} />
                                                <span className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 peer-checked:bg-themeyellow peer-checked:text-white transition">
                                                {language.name}
                                                </span>
                                            </label>
                                                 ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        {JSON.stringify(priceDetails)}
                        {priceDetails.length > 0 && (
                        <div className="w-full">
                            <div className="bg-white rounded-lg shadow-lg border w-full">
                                <h3 className="text-lg font-semibold text-white bg-indigo-900 p-3 rounded-t-md">Price</h3>
                                <div className="p-4 space-y-4">
                                     {priceDetails.map((_price:any,_index:any) => ( 
                                    <div className='w-full' key={_index}>
                                        <h4 className="font-extrabold text-lg">{_price.programName}</h4>
                                        {SelectLanguageData.some((item:any) => (item.languageId === _price.languages[0].languageId &&  item.programId === _price.languages[0].programId)) && (
                                       <><p className="text-sm text-gray-500">{_price.episodeNumber} Episodes • {_price.languages[0].name}</p>
                                        <div className="mt-2 space-y-2 border-t-2 border-dashed border-black">
                                          {_price.languages && _price.languages[0].yearWisePrice.map((year:any,i:any) => (
                                            <label className="flex items-center justify-between cursor-pointer border-b border-dashed border-[#afafaf] py-2" key={i}>
                                                <span className="text-black font-bold">${year.price} <span className="text-gray-500"> / {year.year} year</span></span>
                                                <input type="radio"  name={`price-${_price.languages[0]?.programId}-${year.year}`} className="form-radio text-yellow-500" onClick={() => handlePriceDetails(year, _price.languages[0].programId)} checked={amountDetails.some((item:any) => (item.programId === _price.languages[0]?.programId && item.year == year.year))} />
                                            </label>
                                           ))}
                                        </div>
                                        </>
                                        )}
                                    </div>
                                     ))} 
                                  
                                </div>
                                <div className="p-4 space-y-4 pt-0">
                                    <button className="w-full bg-themeyellow text-white py-3 rounded-full font-semibold hover:bg-themeblue transition">
                                        Total pay now ${totalAmount}
                                    </button>
                                </div>
                            </div>    
                        </div> 
                        )}
                    </div>

                </div>
            </div>
             <Footer /></>
             )}
           
        </>
    );
}


