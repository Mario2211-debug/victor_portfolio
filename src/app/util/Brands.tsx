import Image from 'next/image'
import Django from '../icons/icons8-postgresql.svg'
import Next from '../icons/nextjs-15.svg'
import Node from '../icons/icons8-nodejs.svg'
import RCT from '../icons/React.svg'
import Java from '../icons/icons8-javascript.svg'
import TS from '../icons/icons8-typescript.svg'
import vt from '../icons/icons8-vite.svg'





export default function Brands (){
    return (
        <div className="h-15 flex items-center justify-center">
    <ul className="md:justify-center contents justify-between">
     
    <li className='flex p-2'>
        <Image
            src={Node}
            width={70}
            height={55}
            alt="Picture of the author"
            />          </li>

        <li className='flex p-2'>
        <Image
            src={Next}
            width={55}
            height={55}
            alt="Picture of the author"
            />          
            </li>

            <li className='flex p-1'>
        <Image
            src={vt}
            width={35}
            height={55}
            alt="Picture of the author"
            />          </li>

<li className='flex p-2'>
        <Image
            src={Django}
            width={50}
            height={50}
            alt="Picture of the author"
            />          </li>

<li className='flex p-2'>
        <Image
            src={Java}
            width={35}
            height={55}
            alt="Picture of the author"
            />          </li>



<li className='flex p-2'>
        <Image
            src={TS}
            width={35}
            height={55}
            alt="Picture of the author"
            />          </li>

    
        <li className='flex'>
        <Image
            src={RCT}
            width={55}
            height={55}
            alt="Picture of the author"
            />          </li>
       
             
    </ul>                
</div>
    )
}