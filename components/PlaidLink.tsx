import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';
const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter()
    const [token, setToken] = useState('');
    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user)
            setToken(data?.linkToken);
        }
        getLinkToken();
    }, [user])
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })
        router.push('/');
    }, [user])
    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config)
    return (
        <>
            {variant === 'primary' ? (
                <Button onClick={() => open()}
                    disabled={!ready}
                    className='plaidlink-primary'>Connect Bank</Button>
            ) : variant === 'ghost' ? (
                <Button className='plaidlink-ghost'
                    onClick={() => open()}
                    variant='ghost'>
                    <Image
                        alt='connect-bank'
                        src="/icons/connect-bank.svg"
                        width={24}
                        height={24} />
                    <p className=' text-[16px] font-semibold xl:block'>Connect Bank</p>
                </Button>
            ) : (

                <Button className='plaidlink-default'
                    onClick={() => open()}>
                    <Image
                        alt='connect-bank'
                        src="/icons/connect-bank.svg"
                        width={24}
                        height={24} />
                    <p className='text-[16px] text-black-2 font-semibold'>Connect Bank</p>
                </Button>

            )}
        </>
    )
}

export default PlaidLink
