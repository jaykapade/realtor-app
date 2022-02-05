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
        </>
      ) : (
        <>No Listings Found!</>
      )}
    </div>
  );
};

export default Category;
