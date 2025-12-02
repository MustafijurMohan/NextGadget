import { NavLink, Outlet, useNavigate } from 'react-router'
import { SiBrandfolder } from "react-icons/si";
import { TbCategoryPlus } from "react-icons/tb";
import { LuFileSliders } from "react-icons/lu";
import { MdOutlineProductionQuantityLimits, MdOutlineContactMail  } from "react-icons/md";
import { FaListUl, FaUsers  } from "react-icons/fa";
import { FaBorderNone } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';


const Admin = () => {
  const { token, isAdmin} = useSelector((state) => state.user)
  const navigate = useNavigate()


  if(!token && !isAdmin) {
    return navigate('/')
  }
  


  return (
    <>
        <div className="flex bg-gray-50 pb-4">
          <div className='w-[18%] min-h-screen border-r-1'>
            <div className='flex flex-col gap-4 pt-16 pl-[20%] text-gray-600'>
              <NavLink to='/admin/brand' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
                <SiBrandfolder size={20} />
                <p className='hidden md:block'>Add Brand</p>
              </NavLink>
              <NavLink to='/admin/category' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
                <TbCategoryPlus size={20} />
                <p className='hidden md:block'>Add Category</p>
              </NavLink>
              <NavLink to='/admin/slider' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
                <LuFileSliders size={20} />
                <p className='hidden md:block'>Add Slider</p>
              </NavLink>
              <NavLink to='/admin/add-product' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
                <MdOutlineProductionQuantityLimits size={20} />
                <p className='hidden md:block'>Add Item</p>
              </NavLink>
              <NavLink to='/admin/product-list' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
                <FaListUl  size={20} />
                <p className='hidden md:block'>Product</p>
              </NavLink>
              <NavLink to='/admin/order-list' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
                <FaBorderNone   size={20} />
                <p className='hidden md:block'>Order</p>
              </NavLink>
              <NavLink to='/admin/user-list' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
                <FaUsers size={20} />
                <p className='hidden md:block'>Users</p>
              </NavLink>
              <NavLink to='/admin/contact-list' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
                <MdOutlineContactMail size={20} />
                <p className='hidden md:block'>Contacts</p>
              </NavLink>
            </div>
          </div>
          <div className="flex-1 sm:pl-16 pt-8 w-full">
            <AdminDashboard />
            <Outlet />
          </div>
      </div>
    </>
  )
}

export default Admin







