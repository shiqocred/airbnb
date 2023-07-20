'use client';

import {signIn} from 'next-auth/react';
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
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error)
                setTimeout(() => {
                    toast.error('Invalid email or password!')
                }, 3000)
            }
        })
    }

    const toggle = useCallback(
      () => {
        loginModal.onClose();
        registerModal.onOpen();
      },
      [loginModal, registerModal],
    )
    

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title='Welcome back'
                subtitle='Login to your account!'
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
                        First time using Airbnb?
                    </div>
                    <div onClick={(toggle)} className='text-neutral-800 cursor-pointer hover:underline'>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
    
  return (
    <AuthModal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal