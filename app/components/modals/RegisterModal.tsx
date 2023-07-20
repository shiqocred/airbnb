'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import {useLoginModal, useRegisterModal} from '@/app/hooks';
import {Button, Heading, Input, AuthModal} from '@/app/components';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose();
            toast.success('Register Success!');
            loginModal.onOpen();
        })
        .catch((error) => {
            toast.error(error.code);
            setTimeout(()=>{
                toast.error('Something went wrong.');
            }, 2000)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const toggle = useCallback(
        () => {
          loginModal.onOpen();
          registerModal.onClose();
        },
        [loginModal, registerModal],
      )

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title='Welcome to Airbnb'
                subtitle='Create an account!'
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                type='email'
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                disabled={isLoading}
                type='password'
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label='Continue with Google'
                onClick={() => signIn('google')}
                icon={FcGoogle}
            />
            <Button
                outline
                label='Continue with Github'
                onClick={() => signIn('github')}
                icon={AiFillGithub}
            />
            <div className="
                text-neutral-500 font-light text-center mt-4
            ">
                <div className="
                    flex flex-row items-center justify-center gap-2
                ">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={toggle} className="text-neutral-800 hover:underline cursor-pointer">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
    
  return (
    <AuthModal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal