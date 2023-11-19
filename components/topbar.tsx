import React from 'react'
import Heading from './ui/heading'
import { ComboboxDemo } from './ui/combobox'
import { ModeToggle } from './theme-toggler'

function TopBar() {
    return (
        <div className='py-4 px-6 border-b-2 flex justify-between'>
            <div>
                <ComboboxDemo />
            </div>
            <div className='flex gap-2'>
                <ModeToggle />
                <Heading className='text-md' title='Dashboard' />
            </div>
        </div>
    )
}

export default TopBar