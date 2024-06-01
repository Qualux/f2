import { useState, useEffect } from 'react';
import AppTemplate from '../components/AppTemplate';
import {
    QueryClient,
    QueryClientProvider,
    useQuery
} from '@tanstack/react-query';
import { DashboardAPI } from '../api/DashboardAPI';
import { NavLink } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SkeletonList } from 'shared';
import { BarChart, Bar, XAxis, YAxis, Rectangle, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Stat({ label, stat }) {
    return (
        <div className="overflow-hidden px-4 py-5 sm:p-6">
            <dt className="truncate text-sm font-light text-neutral-400">{label}</dt>
            <dd className="mx-0 p-0 mt-1 text-3xl font-semibold tracking-tight text-neutral-400">{stat}</dd>
        </div>
    );
}

function ManageButtons({ manageRoute, createRoute }) {
    return (
        <span className="isolate inline-flex rounded-md px-2 my-2">
            <NavLink
                to={manageRoute}
                className="no-underline relative inline-flex gap-2 items-center rounded-l-md bg-white/5 px-3 py-1 text-sm font-normal text-neutral-400 hover:text-neutral-300 hover:bg-white/10 focus:z-10"
            >
                <span>
                    Manage
                </span>
                <ArrowUpRightIcon className="h-4 w-4 text-gray-500" />
            </NavLink>
            <NavLink
                to={createRoute}
                className="ml-px no-underline relative inline-flex gap-2 items-center rounded-r-md bg-white/5 px-3 py-1 text-sm font-normal text-neutral-400 hover:text-neutral-300 hover:bg-white/10 focus:z-10"
            >
                <span>
                    Create
                </span>
                <PlusIcon className="h-4 w-4 text-sky-800" />
            </NavLink>
        </span>
    )
}

function DashboardSection({ children }) {
    return (
        <li className="m-0 border border-solid border-sky-900/30 shadow-xl shadow-white grid gap-0 items-start py-3 px-2">
            {children}
        </li>
    )
}

function SectionHeader({ text }) {
    return (
        <header className="text-neutral-600 text-2xl font-light py-1 px-6">
            {text}
        </header>
    )
}

function DashboardGrid3({children}) {

    return(
        <ul className="m-0 p-0 w-full grid grid-cols-3 gap-5 items-stretch">
            {children}
        </ul>
    );

}

function DashboardGrid4Slash3({ children }) {
    return (
        <ul className="m-0 p-0 w-full grid grid-cols-[4fr_3fr] gap-5 items-stretch">
            {children}
        </ul>
    );
}

function UsageChart({ chartData }) {

    return (
        <div style={{ marginTop: '30px', width: '100%', height: '260px' }}>
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 80,
                    }}
                >
                    <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
                    <YAxis />
                    <Legend 
                        formatter={() => "Active Records"} 
                        verticalAlign="bottom" 
                        align="center" 
                        wrapperStyle={{ bottom: 10 }} 
                    />
                    <Bar dataKey="total" fill="#3E3E3E" minPointSize={1} activeBar={<Rectangle fill="#2E2E2E" stroke="black" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}

function DashboardContent() {

    const [chartData, setChartData] = useState(null); 

    const { data, error, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () => DashboardAPI.get(),
    });

    

    useEffect(() => {

        if( isLoading ) {
            return;
        }

        const usageChartData = [
            { name: 'Field Groups', total: parseInt(data.sdo_counts.field_groups.publish) },
            { name: 'Fields', total: parseInt(data.sdo_counts.fields.publish) },
            { name: 'Forms', total: parseInt(data.sdo_counts.forms.publish) },
            { name: 'Post Types', total: parseInt(data.sdo_counts.post_types.publish) },
            { name: 'Taxonomies', total: parseInt(data.sdo_counts.taxonomies.publish) },
            { name: 'Options Pages', total: parseInt(data.sdo_counts.options_pages.publish) },
            { name: 'Grids', total: parseInt(data.sdo_counts.grids.publish) },
            { name: 'Queries', total: parseInt(data.sdo_counts.queries.publish) }
        ];

        setChartData( usageChartData );

    }, [data])

    if (isLoading) {
        return (
            <main>
                <SkeletonList />
            </main>
        )
    }

    return (
        <div className="flex flex-col gap-5 mt-5">
            <DashboardGrid4Slash3>
                <DashboardSection>
                    <SectionHeader text="F3 USAGE" />
                    <UsageChart chartData={chartData} />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="ABOUT F3" />
                    <div className="flex flex-col items-start">
                        <Stat
                            label="LICENSE"
                            stat="F3 STANDARD"
                        />
                        <Stat
                            label="VERSION"
                            stat="F3 v1.0.0"
                        />
                    </div>
                </DashboardSection>
            </DashboardGrid4Slash3>
            <DashboardGrid3>
                <DashboardSection>
                    <SectionHeader text="FIELDS & FORMS" />
                    <div className="flex gap-8 items-center justify-between">
                        <Stat
                            label="FIELD GROUPS"
                            stat={data.sdo_counts.field_groups.publish}
                        />
                        <ManageButtons
                            manageRoute="/field-group"
                            createRoute="/field-group/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat
                            label="FIELDS"
                            stat={data.sdo_counts.fields.publish}
                        />
                        <ManageButtons
                            manageRoute="/field"
                            createRoute="/field/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat
                            label="FORMS"
                            stat={data.sdo_counts.forms.publish}
                        />
                        <ManageButtons
                            manageRoute="/form"
                            createRoute="/form/create"
                        />
                    </div>
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="WORDPRESS REGISTER" />
                    <div className="flex gap-8 items-center justify-between">
                        <Stat
                            label="POST TYPES"
                            stat={data.sdo_counts.post_types.publish}
                        />
                        <ManageButtons
                            manageRoute="/post-type"
                            createRoute="/post-type/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat
                            label="TAXONOMIES"
                            stat={data.sdo_counts.taxonomies.publish}
                        />
                        <ManageButtons
                            manageRoute="/taxonomy"
                            createRoute="/taxonomy/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat
                            label="OPTIONS PAGES"
                            stat={data.sdo_counts.options_pages.publish}
                        />
                        <ManageButtons
                            manageRoute="/options-page"
                            createRoute="/options-page/create"
                        />
                    </div>
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="GRIDS & QUERIES" />
                    <div className="flex gap-8 items-center justify-between">
                        <Stat
                            label="GRIDS"
                            stat={data.sdo_counts.grids.publish}
                        />
                        <ManageButtons
                            manageRoute="/grid"
                            createRoute="/grid/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat
                            label="QUERIES"
                            stat={data.sdo_counts.queries.publish}
                        />
                        <ManageButtons
                            manageRoute="/query"
                            createRoute="/query/create"
                        />
                    </div>
                </DashboardSection>
            </DashboardGrid3>
        </div>
    )
}

export default function Dashboard() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AppTemplate title="Dashboard">
                <DashboardContent />
            </AppTemplate>
        </QueryClientProvider>
    );
}
