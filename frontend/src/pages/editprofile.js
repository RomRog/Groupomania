import React, { Suspense } from 'react';
import { BiLoaderCircle } from 'react-icons/bi'
import EditMyProfile from '../components/Profile/EditMyProfile';

const EditProfile = () => {
    return (
        <div>
            <Suspense fallback={<div className> <BiLoaderCircle/> </div>}>
                <EditMyProfile/>
            </Suspense>
        </div>
    );
};

export default EditProfile;