

import Link from 'next/link';
import { useState, useEffect } from 'react'; 

export default function Navbar() {
  const [menuData, setMenuData] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [childMenuId, setChildMenuId] = useState(null);
  const [renderData, setRenderData] = useState([]); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('https://lottospin.in/wp-json/custom/v1/default-main-menu/');
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        console.log('Error fetching menu:', err);
      }
    };
    fetchMenu();
  }, []);

  const handleChildMenu = (submenuData, submenuId) => {
    setRenderData(submenuData);
    setChildMenuId(submenuId);
  };

  const renderFirstMenu = (items) => {
    return items.map((item) => {
      return item.children && item.children.length > 0 ? (
        <div key={item.id} className="relative">
          <button
            type="button"
            className="flex items-center gap-x-1 text-base text-gray-900"
            aria-expanded={activeMenuId === item.id ? 'true' : 'false'}
            onClick={() => {
              setActiveMenuId(activeMenuId === item.id ? null : item.id); 
              setRenderData([]);
            }}
          >
            {item.title}
            <svg
              className="size-5 flex-none text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {activeMenuId === item.id && (
            <div className="flex absolute top-full -left-8 z-10 mt-3 w-screen max-w-max overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5">
              <div className="p-4">
                <div className={renderData.length > 0 ? 'border-r pr-4' : ''}>
                  {item.children.map((submenu) => (
                    <div
                      onClick={() => { handleChildMenu(submenu.children, submenu.id) }}
                      key={submenu.id}
                      className={`${childMenuId == submenu.id ? 'bg-gray-50' : ''} mb-2 group relative flex items-center gap-x-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50`}
                    >
                      <div className="flex-auto">
                        <a className="block text-base text-gray-900" href="#">
                          {submenu.title.split('-')[0]}
                          <span className="absolute inset-0"></span>
                        </a>
                        <p className="text-gray-600">{submenu.title.split('-')[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {renderData && renderData.length > 0 && (
                <div className={`${childMenuId} p-4 flex flex-col justify-between`}>
                  <div className='flex flex-col'>
                    <p className="text-gray-500">Who is for</p>
                    <div className="grid grid-cols-3 gap-4 mt-5">
                      {renderData.map((renderitem) => {
                        return <Link href="#" key={renderitem.id} style={{ padding: '5px 5px 5px 0px' }}>{renderitem.title}</Link>;
                      })}
                    </div>
                  </div>
                  <button 
                    className="max-w-max ml-auto bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    See All industries
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Link onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)} key={item.id} href="#" className="text-base text-gray-900">
          {item.title}
        </Link>
      );
    });
  };

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">FieldCamp</span>
            <img style={{ mixBlendMode: 'luminosity' }} className="h-8 w-auto" src="https://www.fieldcamp.com/wp-content/uploads/2021/07/Fieldcamp_logo.svg?color=indigo&shade=600" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {renderFirstMenu(menuData)}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="#" className="text-sm text-gray-900">
            <button 
              className="max-w-max ml-auto bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
              TRY it Free
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-10" />
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">FieldCamp</span>
              <img style={{ mixBlendMode: 'luminosity' }} className="h-8 w-auto" src="https://www.fieldcamp.com/wp-content/uploads/2021/07/Fieldcamp_logo.svg?color=indigo&shade=600" alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {renderFirstMenu(menuData)}
              </div>
              <div className="py-6">
                <Link href="#" className="text-sm text-gray-900">
                  <button 
                    className="max-w-max ml-auto bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    TRY it Free
                  </button>
                </Link>          
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
