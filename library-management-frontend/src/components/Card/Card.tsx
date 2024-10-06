import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

type CardProps = {
  name: string;
  detailsLink: string;
  isBook?: boolean;
  author?: string;
  year?: number;
};

const Card = (props: CardProps) => {
  return (
    <div className='shadow-sm rounded-md p-2 flex flex-col justify-between gap-1 bg-slate-100 hover:bg-slate-200 transition-all'>
      <div>
        <p className='text-xs'>Name</p>
        <p className=''>{props.name}</p>
      </div>
      {props.isBook && (
        <div className='flex justify-between'>
          <div>
            <p className='text-xs'>Author</p>
            <p className=''>{props.author ? props.author : 'N/A'}</p>
          </div>
          <div>
            <p className='text-xs'>Year</p>
            <p className=''>{props.year ? props.year : 'N/A'}</p>
          </div>
        </div>
      )}
      <div className='flex flex-col gap-2 pt-2'>
        <hr className='border-slate-700' />
        <Link
          to={props.detailsLink}
          className='rounded-md flex-1 flex justify-center p-1 bg-slate-700 text-white active:bg-slate-600 transition-all'
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
