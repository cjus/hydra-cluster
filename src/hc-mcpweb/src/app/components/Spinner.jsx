import React from 'react';
import Image from 'components/Image';
import LoaderImage from 'images/loader.gif';
import 'css/components/Spinner';

export default function Spinner() {
  return (
    <div className='spinner'>
      <Image src={LoaderImage}/>
    </div>
  );
}
