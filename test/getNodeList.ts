
/***********************************************************
* This file is part of the Slock.it IoT Layer.             *
* The Slock.it IoT Layer contains:                         *
*   - USN (Universal Sharing Network)                      *
*   - INCUBED (Trustless INcentivized remote Node Network) *
************************************************************
* Copyright (C) 2016 - 2018 Slock.it GmbH                  *
* All Rights Reserved.                                     *
************************************************************
* You may use, distribute and modify this code under the   *
* terms of the license contract you have concluded with    *
* Slock.it GmbH.                                           *
* For information about liability, maintenance etc. also   *
* refer to the contract concluded with Slock.it GmbH.      *
************************************************************
* For more information, please refer to https://slock.it   *
* For questions, please contact info@slock.it              *
***********************************************************/

import { assert } from 'chai'
import 'mocha'
import Client, { getNodes } from '../src/client/Client'
import { Transport, RPCRequest, RPCResponse, IN3Config } from '../src'

class TestTransport implements Transport {
    handle(url: string, data: RPCRequest | RPCRequest[], timeout?: number): Promise<RPCResponse | RPCResponse[]> {
        //   test.response[res].id = (data as any)[0].id
        //  return Promise.resolve([test.response[res++]])
        return null
    }
    isOnline(): Promise<boolean> {
        return Promise.resolve(true)
    }
    random(count: number): number[] {
        const r = []
        for (let i = 0; i < count; i++) r[i] = i / count
        return r
    }
}


describe('getNodeList', () => {



    const testServers = {} as any

    testServers["0x7"] = {
        verifier: "eth",
        name: "mainnet",
        needsUpdate: true,
        contractChain: "0x1",
        contract: "0x2736D225f85740f42D17987100dc8d58e9e16252",
        nodeList: [
            {
                deposit: 5000,
                chainIds: [
                    "0x1"
                ],
                address: "0x784bfa9eb182C3a02DbeB5285e3dBa92d717E07a",
                url: "https://in3.slock.it/mainnet/nd-1",
                props: 65535,
                timeout: 3600
            },
            {
                deposit: 5000,
                chainIds: [
                    "0x1"
                ],
                address: "0x00a0a24b9f0e5ec7aa4c7389b8302fd0123194de",
                url: "https://in3.slock.it/mainnet/nd-1",
                props: 65535,
                timeout: 7200
            },
            {
                deposit: 100000,
                chainIds: [
                    "0x1"
                ],
                address: "0x243D5BB48A47bEd0F6A89B61E4660540E856A33D",
                url: "https://in3.slock.it/mainnet/nd-5",
                props: 65535,
                timeout: 7200
            },
            {
                deposit: 100000,
                chainIds: [
                    "0x1"
                ],
                address: "0xeaC4B82273e828878fD765D993800891bA2E3475",
                url: "https://in3.slock.it/mainnet/nd-5",
                props: 65535,
                timeout: 3600
            },
            {
                deposit: 100000,
                chainIds: [
                    "0x1"
                ],
                address: "0x0010f94b296a852aaac52ea6c5ac72e03afd032d",
                url: "https://in3.slock.it/mainnet/nd-5",
                props: 65535,
                timeout: 7200
            }
        ]
    }

    it('should filter by deposit', async () => {

        const t = new TestTransport()

        const n1 = getNodes({
            minDeposit: 5000,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 3600
        }, 1, t)



        assert.deepEqual([{
            deposit: 5000,
            chainIds: ['0x1'],
            address: '0x784bfa9eb182C3a02DbeB5285e3dBa92d717E07a',
            url: 'https://in3.slock.it/mainnet/nd-1',
            props: 65535,
            timeout: 3600
        }], n1 as any, "n1 failed")

        const n2 = getNodes({
            minDeposit: 7500,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 3600
        }, 3, t)


        assert.deepEqual([{
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x243D5BB48A47bEd0F6A89B61E4660540E856A33D',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0xeaC4B82273e828878fD765D993800891bA2E3475',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 3600
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x0010f94b296a852aaac52ea6c5ac72e03afd032d',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        }], n2 as any, "n2 failed")

        const n3 = getNodes({
            minDeposit: 7500,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 3600
        }, 10, t)

        assert.deepEqual([{
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x243D5BB48A47bEd0F6A89B61E4660540E856A33D',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0xeaC4B82273e828878fD765D993800891bA2E3475',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 3600
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x0010f94b296a852aaac52ea6c5ac72e03afd032d',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        }], n3 as any, "n3 failed")


        const n4 = getNodes({
            minDeposit: 15000,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 3600
        }, 1, t)

    })

    it('should filter by exclude', async () => {
        const t = new TestTransport()
        const n1 = getNodes({
            minDeposit: 7500,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 3600
        }, 3, t)

        assert.deepEqual([{
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x243D5BB48A47bEd0F6A89B61E4660540E856A33D',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0xeaC4B82273e828878fD765D993800891bA2E3475',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 3600
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x0010f94b296a852aaac52ea6c5ac72e03afd032d',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        }], n1 as any)

        const n2 = getNodes({
            minDeposit: 7500,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 3600
        }, 3, t, ['0xeaC4B82273e828878fD765D993800891bA2E3475'])

        assert.deepEqual([{
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x243D5BB48A47bEd0F6A89B61E4660540E856A33D',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x0010f94b296a852aaac52ea6c5ac72e03afd032d',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        }], n2 as any)
    })

    it('should filter by timeout', async () => {
        const t = new TestTransport()

        const n1 = getNodes({
            minDeposit: 10000,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 5000
        }, 2, t)

        assert.deepEqual([{
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x243D5BB48A47bEd0F6A89B61E4660540E856A33D',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x0010f94b296a852aaac52ea6c5ac72e03afd032d',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        }], n1 as any)

        const n2 = getNodes({
            minDeposit: 10000,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 5000
        }, 3, t)

        assert.deepEqual([{
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x243D5BB48A47bEd0F6A89B61E4660540E856A33D',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x0010f94b296a852aaac52ea6c5ac72e03afd032d',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        }], n2 as any)

        const n3 = getNodes({
            minDeposit: 5000,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 7200
        }, 3, t)

        assert.deepEqual([{
            deposit: 5000,
            chainIds: ['0x1'],
            address: '0x00a0a24b9f0e5ec7aa4c7389b8302fd0123194de',
            url: 'https://in3.slock.it/mainnet/nd-1',
            props: 65535,
            timeout: 7200
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x243D5BB48A47bEd0F6A89B61E4660540E856A33D',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        },
        {
            deposit: 100000,
            chainIds: ['0x1'],
            address: '0x0010f94b296a852aaac52ea6c5ac72e03afd032d',
            url: 'https://in3.slock.it/mainnet/nd-5',
            props: 65535,
            timeout: 7200
        }], n3 as any)

        /*
        const n4 = getNodes({
            minDeposit: 10000,
            chainId: '0x7',
            requestCount: 1,
            autoUpdateList: false,
            servers: testServers,
            depositTimeout: 10000
        }, 1, t)
        */
    })


})

