import { FC, useState } from 'react'
import {
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Persona,
  TableCell,
} from '@fluentui/react-components'
import { IPersonaOpenAI } from '../types/IPersonaOpenAI'

export const columns: TableColumnDefinition<IPersonaOpenAI>[] = [
  createTableColumn<IPersonaOpenAI>({
    columnId: 'persona',
    compare: (a, b) => {
      return a.roleName.localeCompare(b.roleName)
    },
    renderHeaderCell: () => {
      return 'Persona'
    },
    renderCell: (item) => {
      const overview = `${item.configuration.service} (${item.configuration.model})`
      return (
        <div id="personadiv">
          <TableCell tabIndex={0} role="gridcell">
            <TableCellLayout
              media={
                <Persona
                  presence={{ status: 'available' }}
                  size="medium"
                  name={item.roleName}
                  tertiaryText={overview}
                  avatar={{ color: 'colorful' }}
                />
              }
            />
          </TableCell>
        </div>
      )
    },
  }),

  createTableColumn<IPersonaOpenAI>({
    columnId: 'prompt',
    renderHeaderCell: () => {
      return 'Prompt'
    },
    renderCell: (item) => {
      return (
        <TableCell tabIndex={0} role="gridcell">
          <TableCellLayout description={item.prompt.system} />
        </TableCell>
      )
    },
  }),
]
