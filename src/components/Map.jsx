import React from 'react';

function Map({ embedUrl }) {

  if (!embedUrl) {
    return <div>กรุณาระบุ URL ของแผนที่</div>;
  }

  return (
    
    <div className="container mx-auto px-4 pt-10  ">
      <h2 className="text-[36px] font-medium mb-3">แผนที่</h2>
      
      <div className="max-w-[626px] h-[345px] border-2 aspect-[2/1] overflow-hidden mt-10 rounded-lg ">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

  );
}

export default Map;