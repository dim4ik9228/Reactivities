import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ActivityFilter from "./ActivityFilter";
import { PagingParams } from "../../../app/models/Pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { activityRegistry, loadActivities, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleLoadingNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size])

    return (
        <Container sx={{ mt: 4 }}>
            <Grid
                container
                justifyContent="center"
                alignContent="center"
                justifyItems="center"
                direction="row"
                spacing={4}
            >
                <Grid item xs={7}>
                    {
                        activityStore.loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
                            <>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "800px" }}>
                                    <CircularProgress />
                                </Box>
                            </>
                        ) : (
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={handleLoadingNext}
                                hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                                initialLoad={false}
                            >
                                <ActivityList />
                            </InfiniteScroll>
                        )
                    }


                </Grid>
                <Grid item xs={5}>
                    <ActivityFilter />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    {
                        loadingNext && (
                            <CircularProgress />
                        )
                    }
                </Grid>
            </Grid>
        </Container>
    )
})

