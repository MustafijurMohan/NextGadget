
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/nextgadget.png";
import user from "../assets/user.png";
import { CiSearch, CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { FaBars, FaTimes, FaListUl } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slice/user";
import { selectCartCount } from "../redux/slice/cart";
import { cartList } from "../api/cart";
import { getWishList } from "../api/wish";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const token = useSelector((state) => state.user.token);
  const admin = useSelector((state) => state.user.isAdmin);
  const singleUserData = useSelector((state) => state.user.singleData);
  const wishList = useSelector((state) => state.wish.list);
  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/shop?keyword=${search}`);
    else navigate(`/shop?keyword=0`);
  };

  // Fetch wishlist and cart
  useEffect(() => {
    (async () => {
      if (token) {
        await cartList();
        await getWishList();
      }
    })();
  }, [dispatch, token]);

  // Close mobile menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className="flex justify-between items-center py-2 px-4 font-medium sticky top-0 bg-white shadow-xl z-50">
      {/* logo */}
      <Link to="/" onClick={handleNavClick}>
        <img src={logo} className="h-auto w-28 sm:w-32" alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-4 text-sm text-gray-700">
        <NavLink to="/" className="hover:text-black transition">
          <p>HOME</p>
        </NavLink>
        <NavLink to="/shop" className="hover:text-black transition">
          <p>SHOP</p>
        </NavLink>
        <NavLink to="/about" className="hover:text-black transition">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className="hover:text-black transition">
          <p>CONTACT</p>
        </NavLink>
        {admin && (
          <NavLink
            to="/admin"
            target="_blank"
            className="px-2 py-1 border border-indigo-600 rounded-full"
          >
            <p>Admin Panel</p>
          </NavLink>
        )}
      </ul>

      {/* Search bar (desktop) */}
      <form
        onSubmit={handleSearch}
        className="relative hidden sm:block md:w-72 lg:w-110"
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Products"
          className="w-full px-3 py-3 text-sm text-gray-600 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-3 text-white bg-black p-1 rounded-full mb-1 cursor-pointer"
        >
          <CiSearch size={22} />
        </button>
      </form>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Wishlist */}
        <Link to="/wish" className="relative">
          <CiHeart size={24} />
          {wishList.length > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-black text-white text-center text-[10px] rounded-full">
              {wishList.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <IoCartOutline size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-black text-white text-center text-[10px] rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        <div className="relative group hidden sm:block">
          <Link to="/login">
            <img
              src={singleUserData?.image || user}
              className="w-9 h-9 rounded-full border border-gray-300"
              alt="profile"
            />
          </Link>

          {token && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-200 invisible group-hover:visible">
              <div className="flex flex-col items-center py-4">
                <img
                  src={singleUserData?.image || user}
                  className="w-12 h-12 rounded-full border border-gray-300"
                  alt="user"
                />
                <h6 className="mt-2 text-sm font-medium">
                  {singleUserData?.name || "John Doe"}
                </h6>
                <hr className="w-40 h-[1px] bg-gray-200 mt-3" />
              </div>

              <div className="flex flex-col gap-2 py-3 px-5">
                <NavLink
                  to="/order"
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <FaListUl /> <span>Order</span>
                </NavLink>
                <NavLink
                  to={`/profile/${singleUserData._id}`}
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <AiOutlineUser />
                  <span>Profile</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                >
                  <MdOutlineLogout />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Mobile Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden text-xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Menu Dropdown */}
      <div
        className={`absolute top-14 left-0 w-full bg-white shadow-lg sm:hidden z-40 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 text-gray-700">
          <NavLink to="/" onClick={handleNavClick}>
            <p>HOME</p>
          </NavLink>
          <NavLink to="/shop" onClick={handleNavClick}>
            <p>SHOP</p>
          </NavLink>
          <NavLink to="/about" onClick={handleNavClick}>
            <p>ABOUT</p>
          </NavLink>
          <NavLink to="/contact" onClick={handleNavClick}>
            <p>CONTACT</p>
          </NavLink>
          {admin && (
            <NavLink
              to="/admin"
              target="_blank"
              onClick={handleNavClick}
              className="px-2 py-1 border border-indigo-600 rounded-full"
            >
              <p>Admin Panel</p>
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
