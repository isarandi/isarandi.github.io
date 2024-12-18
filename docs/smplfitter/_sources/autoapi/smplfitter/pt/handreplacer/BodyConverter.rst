smplfitter.pt.handreplacer.BodyConverter
========================================

.. py:class:: smplfitter.pt.handreplacer.BodyConverter(body_model_in, body_model_out, num_betas_out = 10)

   Bases: :py:obj:`torch.nn.Module`


   Converts between different SMPL-family body model parameters.

   :param body_model_in: Input body model to convert from.
   :param body_model_out: Output body model to convert to.
   :param num_betas_out: Number of output beta (body shape) parameters.


   .. py:method:: convert(pose_rotvecs, shape_betas, trans, kid_factor = None, known_output_pose_rotvecs = None, known_output_shape_betas = None, known_output_kid_factor = None, num_iter = 1)

      Converts the input body parameters to the output body model's parametrization.

      :param pose_rotvecs: Input body part orientations expressed as rotation vectors
                           concatenated to shape (batch_size, num_joints*3).
      :param shape_betas: Input beta coefficients representing body shape.
      :param trans: Input translation parameters (meters).
      :param kid_factor: Coefficient for the kid blendshape, which is the difference of
                         the SMIL infant mesh :footcite:`hesse2018smil` and the adult template mesh.
                         See the AGORA paper :footcite:`patel2021agora` for more information.
      :param known_output_pose_rotvecs: If the output pose is already known and only the
                                        shape and translation need to be estimated, supply it here.
      :param known_output_shape_betas: If the output body shape betas are already known
                                       and only the pose and translation need to be estimated, supply it here.
      :param known_output_kid_factor: You may supply a known kid factor similar to
                                      known_output_shape_betas.
      :param num_iter: Number of iterations for fitting.

      :returns:

                Dictionary containing the conversion results
                    - **pose_rotvecs** (*torch.Tensor*) -- Converted body part orientations expressed                     as rotation vectors concatenated to shape (batch_size, num_joints*3).
                    - **shape_betas** (*torch.Tensor*) -- Converted beta coefficients representing                     body shape.
                    - **trans** (*torch.Tensor*) -- Converted translation parameters (meters).



   .. py:method:: convert_vertices(inp_vertices)

      Converts body mesh vertices from the input model to the output body model's topology
      using barycentric coordinates. If no conversion is needed (e.g., same body mesh
      topology in both input and output models, such as between SMPL and SMPL+H), the input
      vertices are returned without change.

      :param inp_vertices: Input vertices to convert, with shape (batch_size, num_vertices_in, 3).

      :returns: Converted vertices, with shape (batch_size, num_vertices_out, 3).



.. footbibliography::