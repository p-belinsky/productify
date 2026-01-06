import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getMyProducts,
    getProductById,
    updateProduct
} from "../lib/api.js";

export const useProducts = () => {
     return useQuery({queryKey: ["products"], queryFn: getAllProducts});

}

export const useCreateProduct = () => {
    return useMutation({mutationFn: createProduct});
}

export const useProduct = (id) => {
   return useQuery({queryKey: ["product", id], queryFn: () => getProductById(id), enabled: !!id})
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["myProducts"]});
        }

    });
}

export const useMyProducts = () => {
    return useQuery({queryKey: ["myProducts"], queryFn: getMyProducts});
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, productData }) =>
            updateProduct(id, productData),
        onSuccess: (_, {id}) => {
            queryClient.invalidateQueries({queryKey: ["products"]});
            queryClient.invalidateQueries({queryKey: ["myProducts"]});
            queryClient.invalidateQueries({queryKey: ["product", id]});
        }
    });
};
