import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Collection Ref
        const listingsRef = collection(db, "listings");
        // Create Query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        // Run Query
        const querySnap = await getDocs(q);
        // console.log(querySnap);
        // Used for Pagination
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = [];
        // console.log(querySnap);

        querySnap.forEach((doc) => {
          return listings.push({ id: doc.id, data: doc.data() });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch Listings");
        console.log(error);
      }
    };

    fetchListings();
  }, [params.categoryName]);

  //   console.log(listings);
  // Pagination Load More
  const onFetchMoreListings = async () => {
    try {
      //Get Collection Ref
      const listingsRef = collection(db, "listings");
      // Create Query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );
      // Run Query
      const querySnap = await getDocs(q);
      // console.log(querySnap);
      // Used for Pagination
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];
      // console.log(querySnap);

      querySnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() });
      });

      setListings((prev) => [...prev, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch Listings");
      console.log(error);
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for Rent"
            : "Places for Sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <>No Listings Found!</>
      )}
    </div>
  );
};

export default Category;
